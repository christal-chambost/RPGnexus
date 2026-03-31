import { prisma } from "@/lib/prisma"
import { WebhookEvent } from "@clerk/nextjs/server"
import { headers } from "next/headers"
import { Webhook } from "svix"

export async function POST(req: Request) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET

  if (!webhookSecret) {
    return new Response("Webhook secret manquant", { status: 500 })
  }

  const headerPayload = await headers()
  const svixId = headerPayload.get("svix-id")
  const svixTimestamp = headerPayload.get("svix-timestamp")
  const svixSignature = headerPayload.get("svix-signature")

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Headers svix manquants", { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(webhookSecret)
  let event: WebhookEvent

  try {
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent
  } catch {
    return new Response("Signature invalide", { status: 400 })
  }

  if (event.type === "user.created") {
    const { id, email_addresses, username } = event.data
    const email = email_addresses[0]?.email_address

    if (!email) {
      return new Response("Email manquant", { status: 400 })
    }

    await prisma.user.create({
      data: {
        clerkId: id,
        email,
        pseudo: username ?? email.split("@")[0],
      },
    })
  }

  if (event.type === "user.deleted") {
    const { id } = event.data
    if (id) {
      await prisma.user.delete({ where: { clerkId: id } })
    }
  }

  return new Response("OK", { status: 200 })
}

import { NextRequest, NextResponse } from "next/server"

interface ContactPayload {
  name?: string
  email?: string
  projectType?: string
  message?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactPayload
    const { name, email, projectType, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Vyplňte prosím jméno, e-mail a zprávu." },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Zadejte prosím platnou e-mailovou adresu." },
        { status: 400 }
      )
    }

    // TODO: napojte reálné odesílání e-mailu, např. přes Resend (https://resend.com):
    //
    // import { Resend } from "resend"
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: "MatthewsLab <noreply@matthewslab.cz>",
    //   to: "ahoj@matthewslab.cz",
    //   subject: `Nová poptávka od ${name}`,
    //   text: `Jméno: ${name}\nE-mail: ${email}\nTyp projektu: ${projectType ?? "—"}\n\n${message}`,
    // })

    console.log("Nová poptávka z webu:", { name, email, projectType, message })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Něco se pokazilo. Zkuste to prosím znovu." },
      { status: 500 }
    )
  }
}

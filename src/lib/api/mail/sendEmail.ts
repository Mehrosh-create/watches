import transporter from './transporter'
import fs from 'fs'
import path from 'path'
import handlebars from 'handlebars'

interface EmailOptions {
  to: string
  subject: string
  template: string
  context: Record<string, unknown>
}

export async function sendEmail(options: EmailOptions) {
  try {
    const templatePath = path.join(process.cwd(), 'src/lib/mail/templates', `${options.template}.html`)
    const templateSource = fs.readFileSync(templatePath, 'utf8')
    const template = handlebars.compile(templateSource)
    const html = template(options.context)

    const mailOptions = {
      from: `"Your App Name" <${process.env.EMAIL_FROM}>`,
      to: options.to,
      subject: options.subject,
      html,
    }

    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error('Failed to send email')
  }
}

// Specific function for password reset
export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  await sendEmail({
    to: email,
    subject: 'Password Reset Instructions',
    template: 'reset-password',
    context: { resetUrl },
  })
}
interface EmailAddressProp {
  emailAddress: string,
}

function EmailAddress(prop: EmailAddressProp) {
  return (
    <div>
      Seu Email: {prop.emailAddress}
    </div>
  )
}

export default EmailAddress

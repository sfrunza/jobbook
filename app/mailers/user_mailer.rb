class UserMailer < Devise::Mailer
  default from: "frunza.sergiu3@gmail.com"

  def reset_password_instructions(record, token, opts = {})
    puts record
    super
  end
end

export const getInquiryTemplate = (name, email, title, message) => {
  return `
    <div style="font-family: 'Georgia', 'Times New Roman', serif; background-color: #FDFBF7; padding: 40px 20px; max-width: 600px; margin: 0 auto; border: 1px solid #F1E2CD; border-radius: 24px; box-shadow: 0 4px 20px rgba(45, 39, 34, 0.05); text-align: left;">
      
      <!-- Header / Brand Accent Bar -->
      <div style="text-align: center; margin-bottom: 30px;">
        <span style="background-color: #FEF3C7; color: #D97706; font-family: 'Segoe UI', Arial, sans-serif; font-weight: 700; font-size: 11px; padding: 6px 16px; border-radius: 100px; text-transform: uppercase; letter-spacing: 1.5px; display: inline-block; margin-bottom: 15px;">
          ✉️ New Message Received
        </span>
        <h1 style="color: #2D2722; margin: 0; font-size: 28px; font-weight: normal; letter-spacing: -0.5px;">
          CS Garden <span style="color: #D97706; font-style: italic;">Inquiry</span>
        </h1>
        <div style="width: 60px; height: 3px; background-color: #D97706; margin: 15px auto 0 auto; border-radius: 2px;"></div>
      </div>

      <!-- Intro -->
      <p style="color: #4A4036; font-family: 'Segoe UI', Arial, sans-serif; font-size: 15px; line-height: 1.7; text-align: center; margin-bottom: 30px;">
        Hi Team, a customer has submitted a new inquiry through the website contact form. Here are the details:
      </p>

      <!-- Details Card -->
      <div style="background-color: #FFFDF9; border: 1px solid #F5E8D3; border-left: 5px solid #D97706; padding: 25px; border-radius: 16px; margin-bottom: 30px;">
        <h3 style="color: #2D2722; margin: 0 0 15px 0; font-size: 18px; font-weight: normal; border-bottom: 1px solid #F1E2CD; padding-bottom: 8px;">
          Contact Information
        </h3>
        
        <table style="width: 100%; border-collapse: collapse; font-family: 'Segoe UI', Arial, sans-serif; font-size: 14px; color: #4A4036;">
          <tr>
            <td style="padding: 8px 0; font-weight: 600; width: 40%; color: #2D2722;">Customer Name:</td>
            <td style="padding: 8px 0; color: #2D2722;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #2D2722;">Email Address:</td>
            <td style="padding: 8px 0;">
              <a href="mailto:${email}" style="color: #D97706; text-decoration: none; font-weight: 600;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #2D2722;">Subject Topic:</td>
            <td style="padding: 8px 0; color: #D97706; font-weight: 700;">${title}</td>
          </tr>
        </table>
      </div>

      <!-- Message Section -->
      <div style="margin-bottom: 30px; font-family: 'Segoe UI', Arial, sans-serif;">
        <p style="margin: 20px 0 8px 0; font-size: 13px; font-weight: 600; color: #2D2722; text-transform: uppercase; letter-spacing: 0.5px;">
          Message Content:
        </p>
        <div style="margin: 0; font-family: 'Georgia', serif; font-size: 14px; color: #5C5246; font-style: italic; background: #FFFDF9; padding: 15px; border-radius: 12px; border: 1px dashed #E6D5BC; line-height: 1.6; white-space: pre-wrap;">
          "${message}"
        </div>
      </div>

      <!-- Action Note -->
      <div style="background-color: #FFFBEB; border: 1px solid #FEF3C7; padding: 16px; border-radius: 12px; font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; color: #B45309; text-align: center; line-height: 1.5;">
        <strong style="text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px;">Reminder</strong> 
        Please respond to this customer at <a href="mailto:${email}" style="color: #B45309; font-weight: bold; text-decoration: underline;">${email}</a> within 12 hours.
      </div>

    </div>
  `;
};

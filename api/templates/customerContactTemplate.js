export const sendInquiryTemplate = (name, email, title, message) => {
  return `
    <div style="font-family: 'Georgia', 'Times New Roman', serif; background-color: #FDFBF7; padding: 40px 20px; max-width: 600px; margin: 0 auto; border: 1px solid #F1E2CD; border-radius: 24px; box-shadow: 0 4px 20px rgba(45, 39, 34, 0.05); text-align: left;">
      
      <!-- Header / Brand Accent Bar -->
      <div style="text-align: center; margin-bottom: 30px;">
        <span style="background-color: #FEF3C7; color: #D97706; font-family: 'Segoe UI', Arial, sans-serif; font-weight: 700; font-size: 11px; padding: 6px 16px; border-radius: 100px; text-transform: uppercase; letter-spacing: 1.5px; display: inline-block; margin-bottom: 15px;">
          ✦ Inquiry Received ✦
        </span>
        <h1 style="color: #2D2722; margin: 0; font-size: 28px; font-weight: normal; letter-spacing: -0.5px;">
          CS Garden <span style="color: #D97706; font-style: italic;">Contact Desk</span>
        </h1>
        <div style="width: 60px; height: 3px; background-color: #D97706; margin: 15px auto 0 auto; border-radius: 2px;"></div>
      </div>

      <!-- Personalized Greeting & Intro -->
      <div style="text-align: center; margin-bottom: 30px; font-family: 'Segoe UI', Arial, sans-serif;">
        <p style="color: #2D2722; font-size: 18px; font-weight: 600; margin: 0 0 10px 0;">
          Hi ${name},
        </p>
        <p style="color: #4A4036; font-size: 15px; line-height: 1.7; margin: 0;">
          Thank you for reaching out to us! We have successfully received your inquiry and our team is currently reviewing your message.
        </p>
      </div>

      <!-- Inquiry Summary Card -->
      <div style="background-color: #FFFDF9; border: 1px solid #F5E8D3; border-left: 5px solid #D97706; padding: 25px; border-radius: 16px; margin-bottom: 25px;">
        <h3 style="color: #2D2722; margin: 0 0 12px 0; font-size: 16px; font-weight: 600; border-bottom: 1px solid #F1E2CD; padding-bottom: 8px; font-family: 'Segoe UI', Arial, sans-serif;">
          Summary of Your Submission
        </h3>
        
        <table style="width: 100%; border-collapse: collapse; font-family: 'Segoe UI', Arial, sans-serif; font-size: 14px; color: #4A4036;">
          <tr>
            <td style="padding: 6px 0; font-weight: 600; width: 35%; color: #2D2722;">Subject Topic:</td>
            <td style="padding: 6px 0; color: #D97706; font-weight: 700;">${title}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: 600; color: #2D2722;">Your Email:</td>
            <td style="padding: 6px 0; color: #2D2722;">${email}</td>
          </tr>
        </table>
      </div>

      <!-- Message Content Copy -->
      <div style="margin-bottom: 30px; font-family: 'Segoe UI', Arial, sans-serif;">
        <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 700; color: #8C7B6B; text-transform: uppercase; letter-spacing: 1px;">
          Your Message:
        </p>
        <div style="margin: 0; font-family: 'Georgia', serif; font-size: 14px; color: #5C5246; font-style: italic; background: #FFFDF9; padding: 18px; border-radius: 12px; border: 1px dashed #E6D5BC; line-height: 1.6; white-space: pre-wrap;">
          "${message}"
        </div>
      </div>

      <!-- Turnaround Expectation Banner -->
      <div style="background-color: #FFFBEB; border: 1px solid #FEF3C7; padding: 18px; border-radius: 14px; font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; color: #B45309; text-align: center; line-height: 1.6; margin-bottom: 30px;">
        <strong style="text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 4px; font-size: 11px;">What Happens Next?</strong> 
        Our team will get back to you shortly at <strong>${email}</strong> (usually within 12 to 24 hours).
      </div>

      <!-- Closing -->
      <div style="text-align: center; font-family: 'Segoe UI', Arial, sans-serif; color: #8C7B6B; font-size: 13px; border-top: 1px solid #F1E2CD; pt: 20px; padding-top: 20px;">
        <p style="margin: 0;">Warm regards,</p>
        <p style="margin: 4px 0 0 0; font-weight: 700; color: #2D2722;">The CS Garden Team</p>
      </div>

    </div>
  `;
};

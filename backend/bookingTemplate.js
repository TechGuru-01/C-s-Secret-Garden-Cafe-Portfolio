export const getReservationTemplate = (
  guests,
  date,
  time,
  name,
  email,
  phone,
  notes,
) => {
  return `
    <div style="background-color: #FEFCE8; padding: 50px 20px; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;">
      
      <div style="max-width: 620px; margin: 0 auto; background-color: #FFFFFF; border-radius: 32px; overflow: hidden; box-shadow: 0 20px 40px rgba(234, 179, 8, 0.06); border: 1px solid #FEF08A;">
        
        <!-- Premium Yellow/Gold Gradient Top Accent -->
        <div style="height: 6px; background: linear-gradient(90deg, #EAB308 0%, #FDE047 50%, #EAB308 100%);"></div>
        
        <!-- Main Content Wrapper -->
        <div style="padding: 50px 40px;">
          
          <!-- Header Section -->
          <div style="text-align: center; margin-bottom: 40px;">
            <div style="margin-bottom: 20px;">
              <span style="background-color: #FEF9C3; color: #854D0E; font-size: 11px; font-weight: 700; padding: 8px 20px; border-radius: 100px; text-transform: uppercase; letter-spacing: 2px; display: inline-block; border: 1px solid #FEF08A;">
                ✦ New Exclusive Booking! ✦
              </span>
            </div>
            <h1 style="color: #1E1B4B; margin: 0; font-family: 'Georgia', 'Times New Roman', serif; font-size: 32px; font-weight: 400; letter-spacing: -0.5px; line-height: 1.2;">
              CS Garden <span style="color: #CA8A04; font-style: italic; font-weight: normal;">Reservation</span>
            </h1>
            <p style="color: #71717A; font-size: 14px; margin: 12px 0 0 0; letter-spacing: 0.5px; text-transform: uppercase;">
              Digital Reservation Desk
            </p>
            <div style="width: 40px; height: 1px; background-color: #E4E4E7; margin: 25px auto 0 auto;"></div>
          </div>

          <!-- Notification Intro -->
          <p style="color: #3F3F46; font-size: 15px; line-height: 1.7; text-align: center; margin-bottom: 35px; font-weight: 400;">
            Hi Team, a new exclusive venue booking request has been registered on our website. Please review the details below to lock off the date in our master calendar:
          </p>

          <!-- Section Label -->
          <div style="margin-bottom: 12px; text-align: center;">
            <span style="font-size: 11px; font-weight: 700; color: #A1A1AA; text-transform: uppercase; letter-spacing: 1.5px;">Event Details</span>
          </div>

          <!-- Elegant Data Box with soft Yellow Tones -->
          <div style="background-color: #FEFDF0; border: 1px solid #FEF9C3; padding: 30px; border-radius: 20px; margin-bottom: 35px; box-shadow: inset 0 2px 4px rgba(234, 179, 8, 0.02);">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.6;">
              <tr>
                <td style="padding: 10px 0; color: #71717A; width: 40%; font-weight: 500;">Scheduled Date:</td>
                <td style="padding: 10px 0; color: #CA8A04; font-weight: 700; font-size: 15px;">${date}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #71717A; border-top: 1px solid #FEF9C3;">Time Block:</td>
                <td style="padding: 10px 0; color: #1E1B4B; font-weight: 600; border-top: 1px solid #FEF9C3;">${time}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #71717A; border-top: 1px solid #FEF9C3;">Estimated Guests:</td>
                <td style="padding: 10px 0; color: #1E1B4B; font-weight: 600; border-top: 1px solid #FEF9C3;">${guests} pax <span style="color: #A1A1AA; font-size: 12px; font-weight: 400;">(Max 50)</span></td>
              </tr>
            </table>
          </div>

          <!-- Customer Information Section -->
          <div style="margin-bottom: 35px;">
            <div style="margin-bottom: 12px; text-align: center;">
              <span style="font-size: 11px; font-weight: 700; color: #A1A1AA; text-transform: uppercase; letter-spacing: 1.5px;">Customer Information</span>
            </div>
            <div style="background-color: #FEFDF0; border: 1px solid #FEF9C3; padding: 30px; border-radius: 20px; box-shadow: inset 0 2px 4px rgba(234, 179, 8, 0.02);">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.6;">
                <tr>
                  <td style="padding: 10px 0; color: #71717A; width: 40%; font-weight: 500;">Name:</td>
                  <td style="padding: 10px 0; color: #1E1B4B; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #71717A; border-top: 1px solid #FEF9C3;">Phone Number:</td>
                  <td style="padding: 10px 0; border-top: 1px solid #FEF9C3;">
                    <a href="tel:${phone}" style="color: #CA8A04; text-decoration: none; font-weight: 600; border-bottom: 1px dashed #EAB308; padding-bottom: 1px;">${phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #71717A; border-top: 1px solid #FEF9C3;">Email Address:</td>
                  <td style="padding: 10px 0; border-top: 1px solid #FEF9C3;">
                    <a href="mailto:${email}" style="color: #CA8A04; text-decoration: none; font-weight: 600; border-bottom: 1px dashed #EAB308; padding-bottom: 1px;">${email}</a>
                  </td>
                </tr>
              </table>
            </div>
          </div>

          <!-- Message/Notes Section (PERFECTLY CENTERED) -->
          <div style="margin-bottom: 40px; text-align: center;">
            <div style="margin-bottom: 12px;">
              <span style="font-size: 11px; font-weight: 700; color: #A1A1AA; text-transform: uppercase; letter-spacing: 1.5px;">Special Requests / Notes</span>
            </div>
            <div style="position: relative; background-color: #FFFDF5; border: 1px solid #FEF08A; padding: 25px 30px; border-radius: 20px; font-family: 'Georgia', serif; font-size: 16px; color: #3F3F46; font-style: italic; line-height: 1.8; white-space: pre-wrap; box-shadow: 0 4px 12px rgba(234, 179, 8, 0.02); text-align: center;">
              <span style="color: #EAB308; font-size: 36px; line-height: 1; font-family: 'Georgia', serif; display: block; margin-bottom: -5px; height: 20px; text-align: center;">“</span>
              <div style="padding: 0 10px; display: inline-block; max-width: 100%; text-align: center;">${notes}</div>
              <span style="color: #EAB308; font-size: 36px; line-height: 1; font-family: 'Georgia', serif; display: block; margin-top: 5px; height: 20px; text-align: center;">”</span>
            </div>
          </div>

          <!-- Luxury Prompt Call-to-Action Card -->
          <div style="background: linear-gradient(135deg, #FFFDF5 0%, #FEF9C3 100%); border: 1px solid #FEF08A; padding: 24px; border-radius: 20px; text-align: center;">
            <span style="font-size: 11px; font-weight: 800; color: #A16207; text-transform: uppercase; letter-spacing: 2px; display: block; margin-bottom: 6px;">Next Steps</span>
            <p style="margin: 0; font-size: 13px; color: #713F12; line-height: 1.6;">
              Please coordinate and verify with the client within 24 hours to secure their down payment and discuss layout setup preferences.
            </p>
          </div>

        </div>
        
        <!-- Premium Yellow/Gold Theme Footer -->
        <div style="background-color: #CA8A04; padding: 20px; text-align: center;">
          <p style="margin: 0; color: #FFFFFF; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; font-weight: 600;">
            © CS Garden Management Systems
          </p>
        </div>

      </div>
    </div>
  `;
};

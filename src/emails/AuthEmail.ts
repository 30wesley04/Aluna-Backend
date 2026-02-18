import { transport } from "../config/nodemailer"
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
dotenv.config();

type EmailType = {
    name: string
    email: string
    token: string
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export class AuthEmail {
    static sendConfirmationEmail = async (user: EmailType) => {
        const email = await transport.sendMail({
            from: 'AlunaCare <alunacare@alunacare.com>',
            to: user.email,
            subject: 'Aluna Care - Confirma tu cuenta',
            html: `
            <table border="0" cellpadding="0" cellspacing="0"
                style="font-family: sans-serif; width: 800px; justify-self: center;">
                <thead>
                    <tr style="height: 5rem;">
                        <th colspan="3" style="background-color: #FFF5E6; text-align: center; padding: 20px 0px;">
                            <p><img src="https://alunacare.com.mx/logo.png" style="width: 150px;" />
                            </p>
                        </th>
                    </tr>
                    <tr style="height: 3rem;">
                        <th style="background-color: #B28172; width: 10%;">&nbsp;</th>
                        <th style="background-color: #B28172;">&nbsp;</th>
                        <th style="background-color: #B28172; width: 10%;">&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="width: 10%; background-color: #FFF5E6;">&nbsp;</td>
                        <td style="padding: 20px 40px 0px 40px; background-color: #FFF5E6;">
                            <div>
                                <p style="font-size: 18px;" id="target-name">Hola ${user.name}</p>
                                <p style="font-size: 18px;">¡Bienvenido a Aluna Care! Para completar la creación de tu cuenta, necesitamos que verifiques tu dirección de correo electrónico.</p>

                                <p style="font-size: 18px;">Tu código de verificación es:</p>

                                <p style="font-size: 25px; font-weight:800">${user.token}</p>

                                <p style="font-size: 17px;">Ingresa a la siguiente liga e ingresa el codigo proporcionado:<br>www.prueba.com<br><br><br></p>

                                <p style="font-size: 15px; margin-top:10px;">Si no solicitaste este código, puedes ignorar este correo de manera segura.</p>
                                <p style="font-size: 15px; font-style:italic">Gracias por unirte a Aluna Care.</p>
                            </div>
                        </td>
                        <td style="width: 10%; background-color: #FFF5E6;">
                    </tr>
                    <tr style="height: 4rem;">
                        <th style="background-color: #FFF5E6; width: 10%;">&nbsp;</th>
                        <th style="background-color: #FFF5E6;">&nbsp;</th>
                        <th style="background-color: #FFF5E6; width: 10%;">&nbsp;</th>
                    </tr>
                    <tr>
                        <td colspan="3" style="background-color: #FFF5E6; height: 2rem;">&nbsp;</td>
                    </tr>
                </tbody>
            </table>`
        })

        // console.log('Mensaje enviado ', email.messageId)
    }

    // static sendConfirmationEmail = async (user: EmailType) => {
    //     const msg = {
    //         to: user.email,
    //         from: {
    //             email: process.env.FROM_EMAIL,
    //             name: "Aluna Care"
    //         },
    //         subject: "Aluna Care - Confirma tu cuenta",
    //         html: `
    //             <table border="0" cellpadding="0" cellspacing="0"
    //                 style="font-family: sans-serif; width: 800px; justify-self: center;">
    //                 <thead>
    //                     <tr style="height: 5rem;">
    //                         <th colspan="3" style="background-color: #FFF5E6; text-align: center; padding: 20px 0px;">
    //                             <p><img src="https://alunacare.com.mx/logo.png" style="width: 150px;" />
    //                             </p>
    //                         </th>
    //                     </tr>
    //                     <tr style="height: 3rem;">
    //                         <th style="background-color: #B28172; width: 10%;">&nbsp;</th>
    //                         <th style="background-color: #B28172;">&nbsp;</th>
    //                         <th style="background-color: #B28172; width: 10%;">&nbsp;</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     <tr>
    //                         <td style="width: 10%; background-color: #FFF5E6;">&nbsp;</td>
    //                         <td style="padding: 20px 35px 0px 35px; background-color: #FFF5E6;">
    //                             <div>
    //                                 <p style="font-size: 18px;" id="target-name">Hola ${user.name}</p>
    //                                 <p style="font-size: 18px;">¡Bienvenido a Aluna Care! Para completar la creación de tu cuenta, necesitamos que verifiques tu dirección de correo electrónico.</p>

    //                                 <p style="font-size: 18px;">Tu código de verificación es:</p>

    //                                 <p style="font-size: 25px; font-weight:800">${user.token}</p>

    //                                 <p style="font-size: 17px;">Ingresa a la siguiente liga e ingresa el codigo proporcionado:<br>www.prueba.com<br><br><br></p>

    //                                 <p style="font-size: 15px; margin-top:10px;">Si no solicitaste este código, puedes ignorar este correo de manera segura.</p>
    //                                 <p style="font-size: 15px; font-style:italic">Gracias por unirte a Aluna Care.</p>
    //                             </div>
    //                         </td>
    //                         <td style="width: 10%; background-color: #FFF5E6;">
    //                     </tr>
    //                     <tr style="height: 4rem;">
    //                         <th style="background-color: #FFF5E6; width: 10%;">&nbsp;</th>
    //                         <th style="background-color: #FFF5E6;">&nbsp;</th>
    //                         <th style="background-color: #FFF5E6; width: 10%;">&nbsp;</th>
    //                     </tr>
    //                     <tr>
    //                         <td colspan="3" style="background-color: #FFF5E6; height: 2rem;">&nbsp;</td>
    //                     </tr>
    //                 </tbody>
    //             </table>
    //             `,
    //     };

    //     try {
    //         await sgMail.send(msg);
    //         console.log("Correo enviado a", user);
    //     } catch (error) {
    //         console.error("Error enviando correo:", error);
    //     }
    // };

}
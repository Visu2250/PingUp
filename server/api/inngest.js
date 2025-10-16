// // import { Inngest } from "inngest";
// // import User from "../models/User.js";
// // import { serve } from "inngest/express";
// // import Connection from "../models/Connection.js";
// // import Story from "../models/Story.js";
// // import Message from "../models/Message.js";

// // // Create a client to send and receive events
// // export const inngest = new Inngest({ id: "pingup-app" });

// // //Inngest Funtion to save user data to databse
// // const syncUserCreation = inngest.createFunction(
// //   { id: "sync-user-from-clerk" },
// //   { event: "clerk/user.created" },
// //   async ({ event }) => {
// //     const { id, first_name, last_name, email_addresses, image_url } =
// //       event.data;
// //     let username = email_addresses[0].email_address.split("@")[0];

// //     //check availability of username
// //     const user = await User.findOne({ username });
// //     if (user) {
// //       username = username + Math.floor(Math.random() * 10000);
// //     }
// //     const userData = {
// //       _id: id,
// //       email: email_addresses[0].email_address,
// //       full_name: first_name + " " + last_name,
// //       profile_picture: image_url,
// //       username,
// //     };
// //     await User.create(userData);
// //   }
// // );

// // //Inngest Funtion to save user data to databse
// // const syncUserUpdation = inngest.createFunction(
// //   { id: "update-user-from-clerk" },
// //   { event: "clerk/user.updated" },
// //   async ({ event }) => {
// //     const { id, first_name, last_name, email_addresses, image_url } =
// //       event.data;

// //     const updatedUserData = {
// //       email: email_addresses[0].email_address,
// //       full_name: first_name + " " + last_name,
// //       profile_picture: image_url,
// //     };
// //     await User.findByIdAndUpdate(id, updatedUserData);
// //   }
// // );

// // //Inngest Funtion to Delete  user data to databse
// // const syncUserDeletion = inngest.createFunction(
// //   { id: "delete-user-from-clerk" },
// //   { event: "clerk/user.deleted" },
// //   async ({ event }) => {
// //     const { id } = event.data;

// //     await User.findByIdAndDelete(id);
// //   }
// // );

// // const sendNewConnectionRequestReminder = inngest.createFunction(
// //   { id: "send-new-connection-request-reminder" },
// //   { event: "app/connection-request" },
// //   async ({ event, step }) => {
// //     const { connectionId } = event.data;
// //     await step.run("send-connection-request-mail", async () => {
// //       const connection = await Connection.findById(connectionId).populate(
// //         "from_user_id"
// //       );
// //       const subject = "New Connecions request";
// //       const body = `<div style="font-family: Arial, sans-serif; padding: 20px;">
// //   <h2>Hi ${connection_to_user_id.full_name},</h2>
// //   <p>You have a new connection request from ${connection_from_user_id.full_name}.</p>
// //   <p><a href="${process.env.FRONTEND_URL}/connections" style="color: #1e90ff;" onclick="process_connection('${connection_from_user_id}')">Click here</a> to accept or reject the request.</p>
// //   <p>Thanks,<br/>PingUp - Stay Connected!</p>
// //   </div>`;
// //   await sendEmail({
// //     to:connection.to_user_id.email,
// //     subject,
// //     body
// //   })
// //     });
// //     const in24Hours=new Date(Date.now()+24*60*60*1000)
// //     await step.sleepUntil("wait-for-24-hours", in24Hours);
// //     await step.run('send-connection-request-reminder' ,async () => {
// //       const connection= await Connection.findById(connectionId).populate('from_user_id');
      
// //       if(connection.status=== "accepted"){
// //         return{message:"Already accepted"}
// //       }

// //        const subject = "New Connecions request";
// //       const body = `<div style="font-family: Arial, sans-serif; padding: 20px;">
// //   <h2>Hi ${connection_to_user_id.full_name},</h2>
// //   <p>You have a new connection request from ${connection_from_user_id.full_name}.</p>
// //   <p><a href="${process.env.FRONTEND_URL}/connections" style="color: #1e90ff;" onclick="process_connection('${connection_from_user_id}')">Click here</a> to accept or reject the request.</p>
// //   <p>Thanks,<br/>PingUp - Stay Connected!</p>
// //   </div>`;
// //   await sendEmail({
// //     to:connection.to_user_id.email,
// //     subject,
// //     body
// //   })

// //   return{ message:"Reminder sent."}





// //     })
// //   }
// // );



// // // Innngest function to delete story after 24 hours
// // const deleteStory = inngest.createFunction(
// //   {
// //     id: 'story-delete',
// //   },
// //   { event: 'app/story.delete' },
// //   async ({ event, step }) => {
// //     const storyId = event.data;
// //     const in24Hours = new Date(Date.now() + 24 * 60 * 60 * 1000);
    
// //     await step.sleepUntil('wait-for-24-hours', in24Hours);

// //     await step.run("delete-story", async () => {
// //       await Story.findByIdAndDelete(storyId)
// //       return { message: "Story deleted." }
// //     })
// //   }
// // )
// // const sendNotificationOfUnseenMessges=inngest.createFunction(
// //   {id:"send-unseen-messages-notification"},
// //   {cron:"TZ=America/New_York 0 9 * * *"},
// //   async({step})=>{
// //     const message=(await Message.find({seen:false})).populate('to_user_id');
// //     const unseenCount={}

// //     messages.map(message=>{
// //       unseenCount[message.to_user_id._id]=(unseenCount[message.to_user_id._id]|| 0)
// //       +1;
// //     })
// //    for (const userId in unseenCount) {
// //   const user = await User.findById(userId);

// //   const subject = `📧 You have ${unseenCount[userId]} unseen messages`;

// //   const body = `
// //     <div style="font-family: Arial, sans-serif; padding: 20px;">
// //       <h2>Hi ${user.full_name},</h2>
// //       <p>You have ${unseenCount[userId]} unseen messages</p>
// //       <p>Click <a href="${process.env.FRONTEND_URL}/messages" style="color: #10B981;">here</a> to view them</p>
// //       <br/>
// //       <p>Thanks,<br/>PingUp - Stay Connected</p>
// //     </div>
// //   `;

// //   // Assume there is an email sending function here, e.g.:
// //   await sendEmail({ to: user.email, subject, html: body }); 
// // }
// // return {message:"Notification sent."}
// //   }
// // )

// // // Create an empty array where we'll export future Inngest functions
// // export const functions = [syncUserCreation, syncUserUpdation, syncUserDeletion ,sendNewConnectionRequestReminder
// //   , deleteStory,sendNotificationOfUnseenMessges
// // ];


// // export default serve({
// //   client: inngest,
// //   functions,
// // });









// import { Inngest } from "inngest";
// import User from "../models/User.js";
// import { serve } from "inngest/express";
// import Connection from "../models/Connection.js";
// import Story from "../models/Story.js";
// import Message from "../models/Message.js";
// import nodemailer from 'nodemailer';

// // Create a client to send and receive events
// export const inngest = new Inngest({ id: "pingup-app" });

// // Email transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const sendEmail = async ({ to, subject, html }) => {
//   // await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, html });
//   const transporter = nodemailer.createTransport({
//   host: 'smtp-relay.brevo.com',
//   port: 587, // SMTP port
//   auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
// });
// };

// // Inngest Function to save user data to database
// const syncUserCreation = inngest.createFunction(
//   { id: "sync-user-from-clerk" },
//   { event: "clerk/user.created" },
//   async ({ event }) => {
//     const { id, first_name, last_name, email_addresses, image_url } = event.data;
//     let username = email_addresses[0].email_address.split("@")[0];

//     const user = await User.findOne({ username });
//     if (user) {
//       username = username + Math.floor(Math.random() * 10000);
//     }
//     const userData = {
//       _id: id,
//       email: email_addresses[0].email_address,
//       full_name: first_name + " " + last_name,
//       profile_picture: image_url,
//       username,
//     };
//     await User.create(userData);



//   }
// );

// // Inngest Function to update user data
// const syncUserUpdation = inngest.createFunction(
//   { id: "update-user-from-clerk" },
//   { event: "clerk/user.updated" },
//   async ({ event }) => {
//     const { id, first_name, last_name, email_addresses, image_url } = event.data;
//     const updatedUserData = {
//       email: email_addresses[0].email_address,
//       full_name: first_name + " " + last_name,
//       profile_picture: image_url,
//     };
//     await User.findByIdAndUpdate(id, updatedUserData);
//   }
// );

// // Inngest Function to delete user data
// const syncUserDeletion = inngest.createFunction(
//   { id: "delete-user-from-clerk" },
//   { event: "clerk/user.deleted" },
//   async ({ event }) => {
//     const { id } = event.data;
//     await User.findByIdAndDelete(id);
//   }


// );

// // Inngest Function for new connection request reminder
// const sendNewConnectionRequestReminder = inngest.createFunction(
//   { id: "send-new-connection-request-reminder" },
//   { event: "app/connection-request" },
//   async ({ event, step }) => {
//     const { connectionId } = event.data;
//     const connection = await Connection.findById(connectionId).populate("from_user_id to_user_id");

//     await step.run("send-connection-request-mail", async () => {
//       const subject = "New Connection Request";
//       const body = `<div style="font-family: Arial, sans-serif; padding: 20px;">
//         <h2>Hi ${connection.to_user_id.full_name || 'User'},</h2>
//         <p>You have a new connection request from ${connection.from_user_id.full_name}.</p>
//         <p><a href="${process.env.FRONTEND_URL}/connections" style="color: #1e90ff;">Click here</a> to accept or reject.</p>
//         <p>Thanks,<br/>PingUp - Stay Connected!</p>
//       </div>`;
//       await sendEmail({
//         to: connection.to_user_id.email,
//         subject,
//         html: body,
//       });
//     });

//     const in24Hours = new Date(Date.now() + 24 * 60 * 60 * 1000);
//     await step.sleepUntil("wait-for-24-hours", in24Hours);

//     await step.run("send-connection-request-reminder", async () => {
//       const connection = await Connection.findById(connectionId).populate("from_user_id to_user_id");
//       if (connection.status === "accepted") {
//         return { message: "Already accepted" };
//       }
//       const subject = "New Connection Request Reminder";
//       const body = `<div style="font-family: Arial, sans-serif; padding: 20px;">
//         <h2>Hi ${connection.to_user_id.full_name || 'User'},</h2>
//         <p>You have a pending connection request from ${connection.from_user_id.full_name}.</p>
//         <p><a href="${process.env.FRONTEND_URL}/connections" style="color: #1e90ff;">Click here</a> to accept or reject.</p>
//         <p>Thanks,<br/>PingUp - Stay Connected!</p>
//       </div>`;
//       await sendEmail({
//         to: connection.to_user_id.email,
//         subject,
//         html: body,
//       });
//       return { message: "Reminder sent" };
//     });
//   }
// );

// // Inngest function to delete story after 24 hours
// const deleteStory = inngest.createFunction(
//   { id: 'story-delete' },
//   { event: 'app/story.delete' },
//   async ({ event, step }) => {
//     const storyId = event.data;
//     const in24Hours = new Date(Date.now() + 24 * 60 * 60 * 1000);
    
//     await step.sleepUntil('wait-for-24-hours', in24Hours);

//     await step.run("delete-story", async () => {
//       await Story.findByIdAndDelete(storyId);
//       return { message: "Story deleted" };
//     });
//   }
// );

// // Inngest function for unseen messages notification
// const sendNotificationOfUnseenMessages = inngest.createFunction(
//   { id: "send-unseen-messages-notification" },
//   { cron: "TZ=America/New_York 0 9 * * *" },
//   async ({ step }) => {
//     const messages = await Message.find({ seen: false }).populate("to_user_id");
//     const unseenCount = {};

//     messages.forEach(message => {
//       unseenCount[message.to_user_id._id] = (unseenCount[message.to_user_id._id] || 0) + 1;
//     });

//     for (const userId in unseenCount) {
//       const user = await User.findById(userId);
//       const subject = `📧 You have ${unseenCount[userId]} unseen messages`;
//       const body = `
//         <div style="font-family: Arial, sans-serif; padding: 20px;">
//           <h2>Hi ${user.full_name},</h2>
//           <p>You have ${unseenCount[userId]} unseen messages</p>
//           <p><a href="${process.env.FRONTEND_URL}/messages" style="color: #10B981;">Click here</a> to view them</p>
//           <p>Thanks,<br/>PingUp - Stay Connected</p>
//         </div>
//       `;
//       await sendEmail({ to: user.email, subject, html: body });
//     }
//     return { message: "Notification sent" };
//   }
// );







// export const functions = [
//   syncUserCreation, syncUserUpdation, syncUserDeletion,
//   sendNewConnectionRequestReminder, deleteStory, sendNotificationOfUnseenMessages
// ];

// export default serve({
//   client: inngest,
//   functions,
// });












import { Inngest } from "inngest";
import User from "../models/User.js";
import { serve } from "inngest/express";
import Connection from "../models/Connection.js";
import Story from "../models/Story.js";
import Message from "../models/Message.js";
import nodemailer from "nodemailer";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "pingup-app" });

// Email transporter (use SMTP or Gmail based on .env)
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Email sending function
const sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    html,
  });
};

// Inngest Function to save user data to database
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    console.log("Event received at", new Date(), "Data:", event.data);
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    let username = email_addresses[0].email_address.split("@")[0];

    const user = await User.findOne({ username });
    if (user) {
      username = username + Math.floor(Math.random() * 10000);
    }
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      full_name: first_name + " " + last_name,
      profile_picture: image_url,
      username,
    };
    try {
      await User.create(userData);
      console.log("User saved:", userData);
    } catch (error) {
      console.error("Error saving user:", error);
      throw error;
    }
  }
);

// Inngest Function to update user data
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    console.log("Event received at", new Date(), "Data:", event.data);
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const updatedUserData = {
      email: email_addresses[0].email_address,
      full_name: first_name + " " + last_name,
      profile_picture: image_url,
    };
    try {
      await User.findByIdAndUpdate(id, updatedUserData);
      console.log("User updated:", id);
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }
);

// Inngest Function to delete user data
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    console.log("Event received at", new Date(), "Data:", event.data);
    const { id } = event.data;
    try {
      await User.findByIdAndDelete(id);
      console.log("User deleted:", id);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
);

// Inngest Function for new connection request reminder
const sendNewConnectionRequestReminder = inngest.createFunction(
  { id: "send-new-connection-request-reminder" },
  { event: "app/connection-request" },
  async ({ event, step }) => {
    console.log("Event received at", new Date(), "Data:", event.data);
    const { connectionId } = event.data;
    const connection = await Connection.findById(connectionId).populate("from_user_id to_user_id");

    await step.run("send-connection-request-mail", async () => {
      const subject = "New Connection Request";
      const body = `<div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Hi ${connection.to_user_id.full_name || 'User'},</h2>
        <p>You have a new connection request from ${connection.from_user_id.full_name}.</p>
        <p><a href="${process.env.FRONTEND_URL}/connections" style="color: #1e90ff;">Click here</a> to accept or reject.</p>
        <p>Thanks,<br/>PingUp - Stay Connected!</p>
      </div>`;
      try {
        await sendEmail({
          to: connection.to_user_id.email,
          subject,
          html: body,
        });
        console.log("Email sent for connection request:", connectionId);
      } catch (error) {
        console.error("Error sending email:", error);
        throw error;
      }
    });

    const in24Hours = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await step.sleepUntil("wait-for-24-hours", in24Hours);

    await step.run("send-connection-request-reminder", async () => {
      const connection = await Connection.findById(connectionId).populate("from_user_id to_user_id");
      if (connection.status === "accepted") {
        return { message: "Already accepted" };
      }
      const subject = "New Connection Request Reminder";
      const body = `<div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Hi ${connection.to_user_id.full_name || 'User'},</h2>
        <p>You have a pending connection request from ${connection.from_user_id.full_name}.</p>
        <p><a href="${process.env.FRONTEND_URL}/connections" style="color: #1e90ff;">Click here</a> to accept or reject.</p>
        <p>Thanks,<br/>PingUp - Stay Connected!</p>
      </div>`;
      try {
        await sendEmail({
          to: connection.to_user_id.email,
          subject,
          html: body,
        });
        console.log("Reminder email sent for connection:", connectionId);
        return { message: "Reminder sent" };
      } catch (error) {
        console.error("Error sending reminder email:", error);
        throw error;
      }
    });
  }
);

// Inngest function to delete story after 24 hours
const deleteStory = inngest.createFunction(
  { id: "story-delete" },
  { event: "app/story.delete" },
  async ({ event, step }) => {
    console.log("Event received at", new Date(), "Data:", event.data);
    const { storyId } = event.data;
    const in24Hours = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await step.sleepUntil("wait-for-24-hours", in24Hours);

    await step.run("delete-story", async () => {
      try {
        await Story.findByIdAndDelete(storyId);
        console.log("Story deleted:", storyId);
        return { message: "Story deleted" };
      } catch (error) {
        console.error("Error deleting story:", error);
        throw error;
      }
    });
  }
);

// Inngest function for unseen messages notification
const sendNotificationOfUnseenMessages = inngest.createFunction(
  { id: "send-unseen-messages-notification" },
  { cron: "TZ=America/New_York 0 9 * * *" },
  async ({ step }) => {
    console.log("Cron triggered at", new Date());
    const messages = await Message.find({ seen: false }).populate("to_user_id");
    const unseenCount = {};

    messages.forEach((message) => {
      unseenCount[message.to_user_id._id] = (unseenCount[message.to_user_id._id] || 0) + 1;
    });

    for (const userId in unseenCount) {
      const user = await User.findById(userId);
      const subject = `📧 You have ${unseenCount[userId]} unseen messages`;
      const body = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Hi ${user.full_name},</h2>
          <p>You have ${unseenCount[userId]} unseen messages</p>
          <p><a href="${process.env.FRONTEND_URL}/messages" style="color: #10B981;">Click here</a> to view them</p>
          <p>Thanks,<br/>PingUp - Stay Connected</p>
        </div>
      `;
      try {
        await sendEmail({ to: user.email, subject, html: body });
        console.log("Notification sent to:", user.email);
      } catch (error) {
        console.error("Error sending notification to", user.email, ":", error);
        throw error;
      }
    }
    return { message: "Notification sent" };
  }
);

export const functions = [
  syncUserCreation,
  syncUserUpdation,
  syncUserDeletion,
  sendNewConnectionRequestReminder,
  deleteStory,
  sendNotificationOfUnseenMessages,
];

export default serve({
  client: inngest,
  functions,
});
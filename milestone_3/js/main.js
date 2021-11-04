Vue.config.devtools = true;

const contacts = [
  {
    name: "Michele",
    avatar: "_1",
    visible: true,
    messages: [
      {
        date: "10/01/2020 15:30:55",
        text: "Hai portato a spasso il cane?",
        status: "sent",
      },
      {
        date: "10/01/2020 15:50:00",
        text: "Ricordati di dargli da mangiare",
        status: "sent",
      },
      {
        date: "10/01/2020 16:15:22",
        text: "Tutto fatto!",
        status: "received",
      },
    ],
  },
  {
    name: "Fabio",
    avatar: "_2",
    visible: true,
    messages: [
      {
        date: "20/03/2020 16:30:00",
        text: "Ciao come stai?",
        status: "sent",
      },
      {
        date: "20/03/2020 16:30:55",
        text: "Bene grazie! Stasera ci vediamo?",
        status: "received",
      },
      {
        date: "20/03/2020 16:35:00",
        text: "Mi piacerebbe ma devo andare a fare la spesa.",
        status: "sent",
      },
    ],
  },
  {
    name: "Samuele",
    avatar: "_3",
    visible: true,
    messages: [
      {
        date: "28/03/2020 10:10:40",
        text: "La Marianna va in campagna",
        status: "received",
      },
      {
        date: "28/03/2020 10:20:10",
        text: "Sicuro di non aver sbagliato chat?",
        status: "sent",
      },
      {
        date: "28/03/2020 16:15:22",
        text: "Ah scusa!",
        status: "received",
      },
    ],
  },
  {
    name: "Luisa",
    avatar: "_4",
    visible: true,
    messages: [
      {
        date: "10/01/2020 15:30:55",
        text: "Lo sai che ha aperto una nuova pizzeria?",
        status: "sent",
      },
      {
        date: "10/01/2020 15:50:00",
        text: "Si, ma preferirei andare al cinema",
        status: "received",
      },
    ],
  },
];

window.addEventListener("DOMContentLoaded", function () {
  const vm = new Vue({
    el: "#root",
    data: {
      contactsList: [...contacts],
      currentContactIndex: 0,
      newMessageText: "",
      randomMessages: [
        "Ciao!",
        "ok",
        "Buongiorno",
        "no",
        "sì",
        "aspettati delle grandi novità",
        "il gatto si è mangiato le tende",
        "Riposi in pace",
        "Vivi di ricordi vividi e lividi",
        "Tu che pizza prendi?",
        "Ci vediamo stasera?",
        "Mi presteresti 5€?",
        "Ho saputo che hai preso la patente, complimenti!!",
        "Quando?",
      ],
    },
    computed: {
      currentContact: function () {
        return this.contactsList[this.currentContactIndex];
      },
    },
    methods: {
      getLastMessageTruncated(contact) {
        let lastMessageIndex = contact.messages.length - 1;
        let lastMessage = contact.messages[lastMessageIndex].text;
        let maxLength = 35;
        if (lastMessage.length > maxLength) {
          lastMessage = lastMessage.substring(0, maxLength).trim() + "...";
        }
        return lastMessage;
      },
      getLastMessageTimeStamp(contact) {
        let lastMessageIndex = contact.messages.length - 1;
        let lastMessageTimeStamp = contact.messages[lastMessageIndex].date;
        return lastMessageTimeStamp;
      },
      getStatusClass(message) {
        if (message.status === "sent") {
          return "message__baloon--sent";
        }
        if (message.status === "received") {
          return "message__baloon--received";
        }
      },

      saveMessage(messageStatus, text = this.newMessageText) {
        const date = new Date();
        this.currentContact.messages.push({
          date: date.toLocaleString("it-IT"),
          text: text,
          status: messageStatus,
        });
        this.newMessageText = "";
      },

      contactAutomaticallyReplies() {
        const randomMessageIndex = this.getRandomNumber(
          0,
          this.randomMessages.length - 1
        );
        const messageText = this.randomMessages[randomMessageIndex];
        if (this.getRandomBoolean()) {
          setTimeout(() => this.saveMessage("received", messageText), 1000);
        }
      },

      getRandomNumber(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
      },

      getRandomBoolean() {
        return Math.round(Math.random()) === 0 ? false : true;
      },
    },
  });
});

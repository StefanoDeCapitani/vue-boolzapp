Vue.config.devtools = true;

const contacts = [
  {
    name: "Michele",
    avatar: "_1",
    visible: true,
    lastAccess: "",
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
    lastAccess: "",
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
    lastAccess: "",
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
    lastAccess: "",
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

const automaticMessages = ["ok", "Ok", "OK!", "ok!", "Ok!"];

window.addEventListener("DOMContentLoaded", function () {
  const vm = new Vue({
    el: "#root",
    data: {
      contactsList: [...contacts],
      currentContactIndex: 0,
      contactSearchInput: "",
      newMessageText: "",
      randomMessages: [...automaticMessages],
      activeDropDownIndex: -1,
    },
    mounted() {
      for (contact of this.contactsList) {
        this.setLastAccess(contact);
      }
    },
    computed: {
      currentContact: function () {
        return this.contactsList[this.currentContactIndex];
      },
    },
    methods: {
      filteredContactsList: function () {
        let filterInput = this.contactSearchInput.toLowerCase();
        let filteredList = [...this.contactsList];
        if (filterInput !== "") {
          filteredList = filteredList.filter((el) =>
            el.name.toLowerCase().includes(filterInput)
          );
        }
        return filteredList;
      },

      getLastMessageTruncated(contact) {
        let lastMessageIndex = contact.messages.length - 1;
        if (!contact.messages[lastMessageIndex]) {
          return "Nessun messaggio";
        }
        let lastMessage = contact.messages[lastMessageIndex].text;
        let maxLength = 35;
        if (lastMessage.length > maxLength) {
          lastMessage = lastMessage.substring(0, maxLength).trim() + "...";
        }
        return lastMessage;
      },

      setLastAccess(contact) {
        let lastMessageIndex = contact.messages.length - 1;
        contact.lastAccess = contact.messages[lastMessageIndex].date;
      },

      getStatusClass(message) {
        return "message__baloon--" + message.status;
      },

      isDropDownActive(index) {
        return this.activeDropDownIndex === index;
      },

      deleteMessage(index) {
        this.currentContact.messages.splice(index, 1);
        this.activeDropDownIndex = -1;
      },

      saveMessage(messageStatus, text = this.newMessageText) {
        const date = new Date();
        this.currentContact.messages.push({
          date: date.toLocaleString("it-IT"),
          text: text,
          status: messageStatus,
        });
        this.setLastAccess(this.currentContact);
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

Vue.config.devtools = true;
dayjs.extend(window.dayjs_plugin_customParseFormat);
dayjs.extend(window.dayjs_plugin_localizedFormat);
dayjs.locale("it");

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
      {
        date: "05/11/2021 16:15:22",
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

      filteredContactsList: function () {
        let filteredList = [...this.contactsList];
        if (this.contactSearchInput) {
          let filterInput = this.contactSearchInput.trim().toLowerCase();
          filteredList = filteredList.filter((el) =>
            el.name.toLowerCase().includes(filterInput)
          );
        }
        return filteredList;
      },
    },

    methods: {
      getTime(date) {
        return dayjs(date, "DD/MM/YYYY HH:mm:ss").format("HH:mm");
      },

      getDateFormatted(date) {
        return dayjs(date, "DD/MM/YYYY HH:mm:ss").format("LL");
      },

      isFirstMessageOfTheDay(index) {
        if (index === 0) {
          return true;
        }

        let currentMessageDate = dayjs(
          this.currentContact.messages[index].date,
          "DD/MM/YYYY HH:mm:ss"
        );
        let previousMessageDate = dayjs(
          this.currentContact.messages[index - 1].date,
          "DD/MM/YYYY HH:mm:ss"
        );

        return !(
          currentMessageDate.format("DD/MM/YYYY") ===
          previousMessageDate.format("DD/MM/YYYY")
        );
      },

      setLastAccess(contact) {
        let receivedMessages = contact.messages.filter(
          (el) => el.status === "received"
        );
        if (receivedMessages.length < 1) return;
        contact.lastAccess = receivedMessages[receivedMessages.length - 1].date;
      },

      getLastMessageTruncated(contact) {
        let lastMessageIndex = contact.messages.length - 1;
        if (!contact.messages[lastMessageIndex]) {
          return "Nessun messaggio";
        }

        let lastMessage = contact.messages[lastMessageIndex].text;
        if (contact.messages[lastMessageIndex].status === "sent") {
          lastMessage = "Tu: " + lastMessage;
        }

        let maxLength = 35;
        if (lastMessage.length > maxLength) {
          lastMessage = lastMessage.substring(0, maxLength).trim() + "...";
        }
        return lastMessage;
      },

      scrollChatToBottom(scrollBehavior, delay) {
        const chat = this.$el.querySelector(".conversation-chat");
        setTimeout(
          () => chat.scrollIntoView({ behavior: scrollBehavior, block: "end" }),
          delay
        );
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
        const date = dayjs();
        this.currentContact.messages.push({
          date: date.format("DD/MM/YYYY HH:mm:ss").replace(",", ""),
          text: text,
          status: messageStatus,
        });
        this.setLastAccess(this.currentContact);
        if (messageStatus === "sent") {
          this.newMessageText = "";
        }
        this.scrollChatToBottom("smooth", 50);
      },

      contactAutomaticallyReplies() {
        const randomMessageIndex = this.getRandomNumber(
          0,
          this.randomMessages.length - 1
        );
        const messageText = this.randomMessages[randomMessageIndex];
        /*         if (this.getRandomBoolean()) { */
        setTimeout(() => this.saveMessage("received", messageText), 1000);
        /*         } */
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

class TodoList {
  constructor(user, emailSenderService) {
    this.user = user;
    this.items = [];
    this.emailSenderService = emailSenderService;
  }

  isUserValid() {
    return this.user && this.user.isValid;
  }

  add(item) {
    console.log("in add if user is valid", this.user.isValid());

    if (!this.user.isValid()) {
      console.log("ddd");

      throw new Error("L'utilisateur n'est pas valide.");
    }

    if (this.items.length >= 10) {
      throw new Error("La TodoList contient déjà 10 items.");
    }

    if (
      item.name.length === 0 ||
      this.items.some((i) => i.name === item.name)
    ) {
      throw new Error("Le nom de l'item doit être unique et non vide.");
    }

    if (item.content.length > 1000) {
      throw new Error("Le contenu de l'item dépasse 1000 caractères.");
    }

    if (this.items.length > 0) {
      const lastItem = this.items[this.items.length - 1];
      const timeDiff = (item.createdAt - lastItem.createdAt) / (1000 * 60);

      if (timeDiff < 30) {
        throw new Error("Un délai de 30 minutes est requis entre deux items.");
      }
    }

    if (this.items.length === 8) {
      const message = "Votre ToDoList est presque remplie !";
      this.emailSenderService.sendEmail(this.user, message);
    }

    this.items.push(item);
  }

  save() {
    throw new Error("Échec de la sauvegarde de l'item.");
  }
}

module.exports =  TodoList ;

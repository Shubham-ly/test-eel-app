const $ = document.querySelector.bind(document);

const username = $("#name");
const email = $("#email");
const password = $("#password");
const addUserBtn = $("#addUserBtn");
const userCardTemplate = $("#userCard");
const userList = $(".user-list");

addUserBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const usernameValue = username.value;
  const emailValue = email.value;
  const passwordValue = password.value;

  if (!usernameValue || !emailValue || !passwordValue) return;

  const result = await eel.add_new_user(
    JSON.stringify({
      name: usernameValue,
      email: emailValue,
      password: passwordValue,
    })
  )();
  if (result.success) {
    username.value = "";
    email.value = "";
    password.value = "";
    const userCard = createUserCard(result.id, usernameValue, emailValue);
    userList.append(userCard);
  }
});

function createUserCard(id, name, email) {
  const userCard = userCardTemplate.content.cloneNode(true);
  userCard.querySelector(".username").textContent = name;
  userCard.querySelector(".email").textContent = email;
  userCard.querySelector(".user-card").dataset.id = id;
  userCard
    .querySelector(".deleteBtn")
    .addEventListener("click", (e) => onUserDeletePressed(e.currentTarget, id));
  return userCard;
}

async function onUserDeletePressed(e, id) {
  const result = await eel.delete_user(id)();
  if (result.success) {
    const userCard = $(`.user-card[data-id="${id}"]`);
    userList.removeChild(userCard);
  }
}

window.onload = async () => {
  const users = await eel.get_all_users()();
  for (let user of users) {
    const userCard = createUserCard(...Object.values(user));
    userList.appendChild(userCard);
  }
};

window.onbeforeunload = () => {
  eel.close_connection();
};

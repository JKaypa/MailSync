const mailchimp = require("@mailchimp/mailchimp_marketing");
require("dotenv").config();

const { MAILCHIMP_KEY, SERVER_PREFIX, LIST_ID } = process.env;

mailchimp.setConfig({
  apiKey: MAILCHIMP_KEY,
  server: SERVER_PREFIX,
});

async function getList() {
  const { members } = await mailchimp.lists.getListMembersInfo(LIST_ID, {
    offset: 0,
    count: 500,
  });
  const memberList = members.map((memb) => ({
    email_address: memb.email_address,
    full_name: memb.full_name,
    id: memb.id,
  }));

  return memberList;
}

const addMember = async (email, name, lastName) => {
  await mailchimp.lists.addListMember(LIST_ID, {
    email_address: email,
    merge_fields: { FNAME: name, LNAME: lastName },
    status: "subscribed",
  });
};

const saveContacts = async (memberList) => {
  const operations = memberList.map((user) => ({
    method: "POST",
    path: `/lists/${LIST_ID}/members`,
    operation_id: user.id,
    body: JSON.stringify({
      email_address: user.email,
      merge_fields: { FNAME: user.name, LNAME: user.lastName },
      status: "subscribed",
    }),
  }));

  await mailchimp.batches.start({ operations });

};

module.exports = { getList, saveContacts, addMember };

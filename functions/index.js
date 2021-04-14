const functions = require('firebase-functions')

exports.onItemCreate = functions.database.ref(
    '/users/{userId}/data/{dataId}').onCreate((snapshot, context) => {
  const userId = context.params.userId
  const dataId = context.params.dataId
  console.log(`New data added: ${dataId} in user ${userId}`)

  const data = snapshot.val()
  const textToUpdate = formatString(data.text)
  return snapshot.ref.update({ text: textToUpdate })
})

function formatString (s) {
  let trimmedString = s.trim()
  trimmedString = trimmedString.replace(/\s+/g, " ")
  return  trimmedString && trimmedString[0].toUpperCase() + trimmedString.slice(1)
}

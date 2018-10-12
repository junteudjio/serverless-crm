const parseUserIdentity = require('../_utils/parse/parse-user-identity')
const parseRequestArguments = require('../_utils/parse/parse-request-arguments').saveDealFromEntity
const db = require('../_utils/adapters/dynamodb-adapter')
const sendMetric = require('../_utils/tracker/invocation-tracker')
const processResponse = require('../_utils/responses/process-response')


exports.handler = async (event) => {
    const user = parseUserIdentity(event)
    const payload = parseRequestArguments(event)
    console.log(payload)
    sendMetric(user.id, user.companyId, 'lambda', 'claudiacrm')
    
    return db.saveDealFromEntity(user, payload)
        .then(data => processResponse.save('Successfully saved to db', data))
        .catch(err => processResponse.gotError('Something went wrong', err))

};

exports.handler = async function (event, context) {
    return {
        status: 200,
        body: JSON.stringify ({message: "Hello World"})
    }
}
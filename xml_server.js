let xmlrpc = require("xmlrpc");

let server = xmlrpc.createServer({ host: "localhost", port: 9090 });

server.on("NotFound", function (method, params) {
  console.log("Method " + method + " does not exist");
});

server.on("anAction", function (err, params, callback) {
  let strAnswer = `Здравствуйте ${params[0][3]?.name} ${params[0][3]?.surname}, мы получили ваше сообщение:"${params[0][0]}". Ваш возраст ${params[0][1]}.`;
  if (params[0][2][0] === "on" && params[0][2][1] === "on") {
    strAnswer += "Приятно знать, что вы преуспели и там и там!";
  } else if (params[0][2][1] === "on") {
    strAnswer += "Приятно знать, что вы Программист.";
  } else if (params[0][2][0] === "on") {
    strAnswer += "Приятно знать, что вы Дизайнер.";
  } else {
    strAnswer += "Найдите себя уже";
  }
  console.log("strAnswer: ", strAnswer);
  console.log(params[0]);
  callback(null, `${strAnswer}`);
});

console.log("XML-RPC server listening on port 9090");

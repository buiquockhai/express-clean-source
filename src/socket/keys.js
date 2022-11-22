const SocketListener = {
  connection: "connection",
  internalCreateRoom: "internal-create-room",

  clientSendSubmitExam: "client-send-submit-exam",
  clientSendRejectExam: "client-send-reject-exam",
};

const SocketEmitter = {
  // server internal
  internalCreateRoom: "internal-create-room",

  // client effect
  serverFeedbackSubmitExam: "server-feedback-submit-exam",
  serverFeedbackRejectExam: "server-feedback-reject-exam",
};

const SocketRoom = {
  global: "global",
};

module.exports = {
  SocketListener,
  SocketEmitter,
  SocketRoom,
};

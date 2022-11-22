const SocketListener = {
  connection: "connection",
  clientSendSubmitExam: "client-send-submit-exam",
  clientSendRejectExam: "client-send-reject-exam",
};

const SocketEmitter = {
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

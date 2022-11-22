const SocketListener = {
  connection: "connection",
  clientSendSubmitExam: "client-send-submit-exam",
  clientSendRejectExam: "client-send-reject-exam",
  clientSendCreateRoom: "client-send-create-room",
  clientSendJoinRoom: "client-send-join-room",
  clientAcceptJoinRoom: "client-accept-join-room",
};

const SocketEmitter = {
  serverFeedbackSubmitExam: "server-feedback-submit-exam",
  serverFeedbackRejectExam: "server-feedback-reject-exam",
  serverFeedbackJoinRoom: "server-feedback-join-room",
  serverFeedbackAcceptJoinRoom: "server-feedback-accept-join-room",
};

const SocketRoom = {
  global: "global",
};

module.exports = {
  SocketListener,
  SocketEmitter,
  SocketRoom,
};

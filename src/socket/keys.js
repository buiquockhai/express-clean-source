const SocketListener = {
  connection: "connection",
  clientSendSubmitExam: "client-send-submit-exam",
  clientSendRejectExam: "client-send-reject-exam",
  clientAcceptJoinRoom: "client-accept-join-room",
};

const SocketEmitter = {
  serverFeedbackSubmitExam: "server-feedback-submit-exam",
  serverFeedbackRejectExam: "server-feedback-reject-exam",
  serverFeedbackJoinRoom: "server-feedback-join-room",
  serverFeedbackAcceptJoinRoom: "server-feedback-accept-join-room",
  serverFeedbackRejectJoinRoom: "server-feedback-reject-join-room",
  serverFeedbackCancelJoinRoom: "server-feedback-cancel-join-room",
  serverFeedbackUpdateAnswer: "server-feedback-update-answer",
  serverFeedbackForceLeave: "server-feedback-force-leave",
};

module.exports = {
  SocketListener,
  SocketEmitter,
};

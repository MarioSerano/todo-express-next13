export const isResponseError: (err: Error) => err is ResponseError = (
  err
): err is ResponseError =>
  typeof (err as ResponseError).messages !== "undefined";

class ResponseError extends Error {
  public status;
  public messages;
  constructor(messages: string[], status?: number) {
    super(messages.toString());
    this.messages = messages;
    this.status = status;
  }
}

export default ResponseError;

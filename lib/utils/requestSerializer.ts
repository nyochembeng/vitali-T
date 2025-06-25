export const serializeRequest = (request: any): string => {
  try {
    // Ensure no circular references or non-serializable data
    const cleanedRequest = {
      id: request.id,
      method: request.method,
      url: request.url,
      headers: request.headers,
      data: request.data,
      timestamp: request.timestamp,
      attempts: request.attempts,
      service: request.service,
    };
    return JSON.stringify(cleanedRequest);
  } catch (error) {
    throw new Error("Failed to serialize request: " + error);
  }
};

export const deserializeRequest = (serialized: string): any => {
  try {
    const request = JSON.parse(serialized);
    // Validate required fields
    if (!request.id || !request.method || !request.url || !request.service) {
      throw new Error("Invalid request format");
    }
    return request;
  } catch (error) {
    throw new Error("Failed to deserialize request: " + error);
  }
};

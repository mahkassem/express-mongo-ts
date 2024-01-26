// Handler decorator
export const Handler = (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
  const originalMethod = descriptor.value;
  descriptor.value = async function (...args: any[]) {
    try {
      const result = await originalMethod.apply(this, args);
      return result;
    } catch (error) {
      const [req, res] = args;
      const { message } = error as Error;
      res.status(500).json({
        message,
      });
    }
  };
  return descriptor;
}

const flipArgs = (fn) => (...args) => fn(args.reverse());

export { flipArgs };

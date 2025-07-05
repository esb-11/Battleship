const PubSub = (() => {
  const events = {};

  function on(eventName, func) {
    events[eventName] = eventName[eventName] ? events[eventName] : [];
    events[eventName].push(func);
  }

  function off(eventName, func) {
    if (events[eventName]) {
      events[eventName] = events[eventName].filter((fn) => fn != func);
    }
  }

  function emit(eventName, ...data) {
    if (events[eventName]) {
      for (const fn of events[eventName]) {
        fn(...data);
      }
    }
  }

  return { on, off, emit };
})();

export default PubSub;

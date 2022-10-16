ILoveWeb.load({
  lang: 'js',
  doc: '',
  tasks: [
    {
      text: 'Write a JavaScript function with name "test" that returns "iloveweb".',
      validator(code) {
        const f = new Function(`
          ${code};
          return test();
        `);
        return f() === 'iloveweb';
      }
    }
  ]
});
ILoveWeb.load({
  lang: 'js',
  doc: '',
  tasks: [
    {
      text: 'Напиши JavaScript функция с име "test". Нека резултът от нея да е думата "daskalo".',
      validator(code) {
        const f = new Function(`
          ${code};
          return test();
        `);
        return f() === 'daskalo';
      }
    }
  ]
});
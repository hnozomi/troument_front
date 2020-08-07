const titleValidation = (title) => {
  if (!title) return 'タイトルを入力してください';
  if (title.length > 40) return 'タイトルは40文字以内で入力してください';

  return '';
};

const tagValidation = (tag) => {
  if (tag.length === 0) return 'タグを入力してください';
  if (tag.length > 5) return 'タグは5つまでしか登録できません';
  return '';
};

const savedDataValidation = (savedData) => {
  if (savedData.blocks.length === 0) return '内容を入力してください';
  return '';
};

const accountValidation = (account) => {
  if (!account) return '登録する名前を入力してください';
  return '';
};

const passwordValidation = (password) => {
  if (!password) return 'パスワードを入力してください';
  if (password.length < 4) return 'パスワードは4文字以上入力してください';
  return '';
};


class Validation {
  static formValidate = (type, value) => {
    switch (type) {
      case 'title':
        return titleValidation(value);
      case 'tags':
        return tagValidation(value);
      case 'savedData':
        return savedDataValidation(value);
      case 'account':
        return accountValidation(value);
      case 'password':
        return passwordValidation(value);
      case 'others':
        default:
    }
  };
}



export default Validation;
const titleValidation = (title) => {
  if (!title) return 'タイトルを入力してください';
  if (title.length > 40) return 'タイトルは40文字以内で入力してください';

  return '';
};

const tagValidation = (tag) => {
  console.log(tag.length)
  if (!tag) return 'タグを入力してください';
  if (tag.length > 3) return 'タグが5つまでしか登録できません';
  return '';
};

const worryValidation = (worry) => {
  if (!worry) return '悩みを入力してください';
  return '';
};

const resolveValidation = (resolve) => {
  if (!resolve) return '解決した方法を入力してください';
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
      case 'tag':
        return tagValidation(value);
      case 'worry':
        return worryValidation(value);
      case 'resolve':
        return resolveValidation(value);
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
import * as consts from './consts';

export const initAction = (data) => {
	return {
		type: consts.INIT_ACTION,
		payload: data,
	};
};

export const transtaleMe = ({word, langFrom, langTo}) => {
	console.log("--- ", word)
	console.log("--- ", langFrom)
	console.log("--- ", langTo)
  // console.log("--- ", translate)
  return {
    type: consts.TRANSLATE
  }
}

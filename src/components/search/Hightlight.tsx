import React, { ChangeEvent,  useEffect, useState} from "react"
type HightlightType = {
	filter:any
	str:any
}

export const Hightlight:React.FC<HightlightType> = (props) => {
	const { filter, str } = props
	if (!filter) return str
	//регулярное выражение,  'ig'-флаг который ищет без зависимости регистра, те отдает массив
	const regexp = new RegExp(filter, 'ig')
	// находим есть ли совподение в строке
	const matchValue = str.match(regexp)
	//затем проверяем
	if (matchValue) {
	//   console.log('matchValue', matchValue)
	//   console.log('str.split(regexp)', str.split(regexp))
	  //разделим строку на те элементы до появления совпадения и после и вернем все это в переменную
	  // str.split(regexp) - получим массив из строк разделенный нашим фильтром
	  return str.split(regexp).map((s:string, index:number, array:any) => {
		 if (index < array.length - 1) {
			 // первое совподение которое получили в matchValue
			const c = matchValue.shift()
			//возвращаем фрагмент и совподение
			return <>{s}<span className={'hightlight'}>{c}</span></>
		 }
		 return s
	  })
	}
	return str
 }
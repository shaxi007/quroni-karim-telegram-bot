const api=require('./telegram.js')
const fetch=require('node-fetch')
const TelegramAPI=require('node-telegram-bot-api')
let bot=new TelegramAPI(api,{polling:true})
let arr=[]
for(let i=1;i<115;i++){
	arr.push(i)
}

const start =async ()=>{
	bot.on("message",async msg=>{
		const text = msg.text;
        const chatId = msg.chat.id;
		try{
		let soz='',raqam='',splited=text.split(' ')
		for(let i of text){
			if(i==' ') soz+='/'
			else soz+=i
			if(i!==' ') raqam+=i 
		}
		if(text=='/start') bot.sendMessage(chatId,'Assalomu alaykum\n Menga sura raqamini keyin oyat raqamini yuboring.\n(Masalan: 2 2 //Quroni Karimdagi 2-oyat 2-surasi)')
		else if(text!=='/start'&& !(+raqam)) {
			bot.sendMessage(chatId,"Noto'g'ri formatda kiritdingiz !")
		}
		if(+raqam && splited[0]>0&&splited[0]<115){
	        let response =await fetch(`https://api.quran.sutanlab.id/surah/${soz}`)
	        let res =await fetch(`https://quranenc.com/api/translation/sura/uzbek_mansour/${splited[0]}`)
			response=await response.json()
			res=await res.json()
			bot.sendAudio(chatId,`${response.data.audio.primary}`,{caption:`${splited[0]}. ${response.data.surah.name.transliteration.en}\n${response.data.text.arab}\n${res.result[splited[1]-1].translation}`,title:`${response.data.surah.name.transliteration.en}`})
		}
	}catch(err){
		bot.sendMessage(chatId,'Noto\'g\'ri formatda kiritdingiz !')
	}		
	})
}

start()
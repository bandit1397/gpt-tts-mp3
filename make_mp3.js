const fs = require("fs");
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: "sk-proj-- "
});

async function makeMp3() {

    const text = `
Up to now, we have looked at the outside of Gwanghwamun Gate,
the Street of Six Ministries, Yukjo-geori.
Shall we now go into the palace through Heungnyemun Gate?

Heungnyemun is the second south gate of Gyeongbokgung Palace.

At first, it was called Hongnyemun,
but during King Gojong's reign,
it was changed to Heungnyemun.

Using the character 'hong',
the same character as Emperor Qianlong's name,
Hong Li in Qing Dynasty of China was considered improper.

Now, we can find the sculptures placed on the staircase of Heungnyemun
which are conspicuously showing mythical animals,
haechi,
described in Record of Rarities or Odd Things.
`;

    const response = await openai.audio.speech.create({
        model: "gpt-4o-mini-tts",

        voice: "nova",

        instructions:
            "Speak like a professional museum guide. "
          + "Warm, natural, clear, and engaging. "
          + "Use appropriate pauses between sentences. "
          + "Emphasize historical names gently. "
          + "Sound like a real tour guide leading visitors through Gyeongbokgung Palace.",

        input: text
    });

    const buffer = Buffer.from(
        await response.arrayBuffer()
    );

    fs.writeFileSync("1.mp3", buffer);

    console.log("✅ 1.mp3 생성 완료");
}

makeMp3().catch(console.error);

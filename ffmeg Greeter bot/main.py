import auth
import asyncio
from discord.ext.commands import Bot
bot = Bot(command_prefix="--")

@bot.event
async def on_ready():
    print('Logged in as')
    print(bot.user.name)
    print(bot.user.id)
    print('------')

@bot.command()
async def ah(*args):
    voice_ch = bot.voice_channel
    if voice_ch is not None:
        player = bot.voice.create_ffmpeg_player('music.mp3')
        player.start()
    while not player.is_done():
        asyncio.sleep(2)
    bot.voice.disconnect()


bot.run(auth.TOKEN)
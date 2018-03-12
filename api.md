# canvasTrigger

**define objects in canvas and dispatch canvas event to those objects.**

2015/8/3 by DKZ update 2018/3/12

## API

### canvasTrigger





### ctAnimation

Animation controler to control frame animation

- FRAME_TIME static <int> default 16 1000ms/60fps

#### start() <void>

#### stop() <void>

#### reset() <void>

#### on(func,that) <void>
register animation function on loop
- func <function> 
- that <context>

#### off(func,context) <void>
unregister animation function off loop
- func <function> 
- that <context>

### ctPlaySound

Sound player use HTML5 audio  

- path <string> default './'
- type <string> default '.mp3' file type
- volume <number> default 0.5

#### loadsound(name) <audio>
load sound file
- name <string> file name

#### play(name) <void>
- name <string> file name

#### pause(name) <void>
- name <string> file name

#### replay(name) <void>
- name <string> file name

#### stop(name) <void>
- name <string> file name

#### onloop(name) <void>
loop forever
- name <string> file name

#### offloop(name) <void>
stop loop
- name <string> file name

#### loop(name,times) <void>
loop some times
- name <string> file name
- times <int> loop times

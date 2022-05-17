
del juegodatos.js
cd datos
SET count=0
echo export default function grupos(){ >> ..\juegodatos.js
echo var Found=[]; >> ..\juegodatos.js
 FOR /f "tokens=*" %%G IN ('dir /b') DO (call :subroutine %%G)

echo return Found;} >> ..\juegodatos.js
cd ..
cd ..
del juegodatos.js
cd ..
del juegodatos.js

:subroutine
 echo Found[%count%]={"nombre":"%1","datos": >> ..\juegodatos.js
 type %1 >> ..\juegodatos.js
 echo };>> ..\juegodatos.js
 set /a count+=1
 GOTO :eof
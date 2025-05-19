
// JavaScript al final de tu <body> o en un archivo .js separado
// 1) Array de configuración: cada objeto tiene el ID del botón y su URL destino
const botones = [
   { id: 'btnCertiCiber1', url: 'https://1drv.ms/b/c/16b2243148ddcc68/ESYSVp7zfUdPl1qyRGYGSk4BXTs6dSBMYxkcF0kSLMq-MA?e=yV3OTd' },
   { id: 'btnCertiCiber2', url: 'https://1drv.ms/b/c/16b2243148ddcc68/EVKDdhPfxQpNuN3i8dx3AbUBwhtUOhUlJKtb7fS2-xOu5A?e=hXHaqg' },
   { id: 'btnCertiEnglish', url: 'https://1drv.ms/b/c/16b2243148ddcc68/EYyDJdfQmztOvE-zfMue0M0BayGRFI2C00sZG8ruNvcNvQ?e=oU2zUt' },
   { id: 'BTN1', url: 'https://github.com/Farid-Mejia/SistemaEstacionamientoCibertec'},
   { id: 'BTN2', url: ''},
   { id: 'BTN3', url: 'https://github.com/Farid-Mejia/SistemaPermisosLaborales'}
];

// 2) Recorremos el array y añadimos el listener a cada botón
botones.forEach(({ id, url }) => {
   const btn = document.getElementById(id);
   if (!btn) return;  // si no existe, saltar

   btn.addEventListener('click', e => {
      e.preventDefault();                        // evita acción inmediata :contentReference[oaicite:2]{index=2}
      btn.classList.add('blur-out-expand');      // dispara la animación

      // Cuando la animación termine...
      btn.addEventListener('animationend', () => {
         window.open(url, '_blank');              // abre en nueva pestaña
         btn.classList.remove('blur-out-expand'); // limpia para próximos clics
      }, { once: true });
   });
});






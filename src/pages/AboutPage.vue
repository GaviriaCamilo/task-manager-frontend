<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center py-6 sm:py-10">
    <div class="bg-white rounded-3xl shadow-2xl p-4 sm:p-8 md:p-10 max-w-full sm:max-w-2xl w-full border border-blue-100 mx-2">
      <div class="flex flex-col items-center mb-6">
        <img
          src="@/assets/img/perfilcamilo.webp"
          alt="Foto de Camilo Andrés Gaviria Hoyos"
          class="w-24 h-24 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-blue-400 shadow-lg mb-4"
          loading="lazy"
        />
        <h2 class="text-xl sm:text-3xl font-extrabold text-blue-700 mb-1 text-center">Camilo Andrés Gaviria Hoyos</h2>
        <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-gray-600 text-xs sm:text-sm mb-2">
          <span class="flex items-center gap-1"><svg class="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 016 6c0 4.418-6 10-6 10S4 12.418 4 8a6 6 0 016-6zm0 8a2 2 0 100-4 2 2 0 000 4z"/></svg>Colombia</span>
          <span>·</span>
          <a href="https://www.linkedin.com/in/camilo-gaviria-05273131b" target="_blank" class="flex items-center gap-1 text-blue-500 hover:underline">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.845-1.563 3.043 0 3.604 2.003 3.604 4.605v5.591z"/></svg>
            LinkedIn
          </a>
          <span>·</span>
          <span class="flex items-center gap-1"><svg class="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 2.2z"/></svg>+57 3218918727</span>
          <span>·</span>
          <span class="flex items-center gap-1"><svg class="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/></svg>camilogav24@gmail.com</span>
        </div>
      </div>
      <div class="text-gray-700 space-y-4 sm:space-y-6 text-sm sm:text-base">
        <section>
          <h3 class="text-base sm:text-lg font-semibold text-blue-600 mb-1">Sobre mí</h3>
          <p>
            Analista y Desarrollador de Software con experiencia en desarrollo Frontend y Backend. Apasionado por el aprendizaje continuo, la resolución de problemas y la adaptación a nuevas tecnologías. Disfruto del trabajo en equipo y los desafíos técnicos. Tengo muchas ganas de aportar mis conocimientos en una empresa y desde hace mucho tiempo me gusta el desarrollo de software. Espero que me den una oportunidad para demostrar mi compromiso y capacidades. Busco seguir creciendo profesionalmente y aportar con mis conocimientos.
          </p>
        </section>
        <section>
          <h3 class="text-base sm:text-lg font-semibold text-blue-600 mb-1">Sobre este proyecto</h3>
          <p>
            Este es un Task Manager simple desarrollado como prueba técnica. Permite crear, listar, completar y eliminar tareas usando Vue 3 en el frontend y Laravel en el backend, conectados a una base de datos MySQL. El objetivo es demostrar buenas prácticas de desarrollo, integración de API REST y una interfaz clara y funcional.
          </p>
        </section>
        <section>
          <h3 class="text-base sm:text-lg font-semibold text-blue-600 mb-1">Tecnologías y habilidades</h3>
          <p>
            HTML, CSS, JavaScript, Vue.js, Tailwind CSS, Bootstrap, PHP, Laravel, Python, Flask, SQL, Postman, Git/GitHub, API REST, despliegues, trabajo en equipo, comunicación, resolución de problemas y aprendizaje continuo.
          </p>
        </section>
        <section>
          <h3 class="text-base sm:text-lg font-semibold text-blue-600 mb-1">Educación</h3>
          <p>
            Tecnólogo en Análisis y Desarrollo de Software (SENA), cursos en desarrollo web, bases de datos, ventas y bootcamps de programación.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>
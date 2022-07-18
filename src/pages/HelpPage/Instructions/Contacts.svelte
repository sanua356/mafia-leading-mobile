<div class="instruction">
    <h2>Контакты</h2>
    <hr />
    <p>
        Если вы обнаружили баг или у вас есть предложение по улучшению
        приложения, можете написать на данную почту.
    </p>
    <!-- svelte-ignore a11y-missing-attribute -->
    <a
        class="email link"
        on:click={() => navigator.clipboard.writeText("mafia.leading@mail.ru")}
    >
        mafia.leading@mail.ru <img
            src="assets/clipboard.svg"
            alt="Копировать в буфер обмена"
        />
    </a>
    <p>Ваш запрос будет рассмотрен в ближайшее время после поступления.</p>
</div>

<style>
    .instruction {
        overflow-y: auto;
    }
    .email {
        word-break: break-all;
        display: block;
        margin: 20px 0;
        font-size: 1.5rem;
        opacity: 0.7;
    }
    .email img {
        display: inline-block;
        max-width: 25px;
        height: auto;
    }
    .email:active {
        opacity: 1;
    }
</style>

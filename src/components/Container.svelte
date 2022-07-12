<div class="container"><slot /></div>

<style>
    :global(.container) {
        width: 100%;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        color: #eeeef5;
        align-self: baseline;
        margin-right: auto;
        padding: 25px;
    }
    @media screen and (min-width: 481px) and (max-width: 1024px) {
        :global(.container) {
            width: 80%;
            margin: 0 auto;
        }
    }
    @media screen and (min-width: 1025px) and (max-width: 1440px) {
        :global(.container) {
            width: 70%;
            margin: 0 auto;
        }
    }

    :global(.container h1) {
        font-size: 2.2rem;
    }
    :global(.container hr) {
        margin-top: 10px;
        margin-bottom: 45px;
        background-color: #eeeef5;
        border: none;
        border-radius: 3px;
        height: 5px;
        width: 25%;
    }

    :global(.buttons) {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        margin-top: 15px;
        margin-left: auto;
        margin-right: auto;
    }
    @media screen and (max-width: 440px) {
        :global(.buttons) {
            justify-content: center;
            text-align: center;
        }
        :global(.buttons *) {
            margin-bottom: 15px;
        }
        :global(.buttons *:last-child) {
            margin-bottom: 0;
        }
    }
</style>

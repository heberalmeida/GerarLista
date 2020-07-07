<template>
  <div id="app">
    <img src="./assets/lista.png" border="0" />
    <form @submit.prevent="getGerar">
      <ul>
        <li class="lista-raid">
          <label class="total zero">🔰 RAID LEVEL </label>
          <select class="imputs" v-model="form.raid">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
          </select>
          <label class="total um">
            <input type="checkbox" value="EX" v-model="form.ex" /> EX
          </label>
        </li>
        <li class="color">
          <label class="azul">
            <input
              name="color"
              type="radio"
              v-model="form.color"
              value="Mystic-Azul"
            />
            <span></span>
          </label>

          <label class="amarelo">
            <input
              name="color"
              type="radio"
              v-model="form.color"
              value="Instinct-Amarelo"
            />
            <span></span>
          </label>

          <label class="vermelho">
            <input
              name="color"
              type="radio"
              v-model="form.color"
              value="Valor-Vermelho"
            />
            <span></span>
          </label>
        </li>
        <li class="lista">
          <label class="total">🐣 Chefe: </label>
          <input class="imputs" type="text" v-model="form.chefe" required />
        </li>
        <li class="lista">
          <label class="total">⏳ Hora:</label>
          <the-mask
            class="imputs"
            mask="##:##"
            required
            :masked="true"
            v-model="form.time"
          />
        </li>
        <li class="lista">
          <label class="total">🏟 Gym:</label>
          <input class="imputs" type="text" v-model="form.gym" required />
        </li>
        <li class="lista">
          <label class="total">🏘️ Local: </label>
          <input class="imputs" type="text" v-model="form.location" />
        </li>
        <li class="lista">
          <label class="total">📍 Coords:</label>
          <input class="imputs" type="text" v-model="form.coord" />
        </li>
        <li class="qtd-lista">
          <label class="total">🚶Quant. Lista </label>
          <select class="imputs" v-model="form.qtdLista">
            <option v-for="n in listas" :key="n" v-show="n > 2">{{ n }}</option>
          </select>
        </li>
      </ul>

      <ul>
        <li v-for="(u, k) in users" :key="k">
          <div class="users">
            <div class="nick">
              <input
                class="imputs"
                placeholder="Nick"
                type="text"
                v-model="u.nick"
              />
            </div>
            <div class="level">
              <the-mask
                type="number"
                class="nick-level imputs"
                mask="##"
                v-model="u.level"
              />
            </div>
          </div>
        </li>
      </ul>

      <pre ref="result">
      <div class="poke_raid">
    🔰 *RAID LEVEL {{form.raid}}{{form.ex ? ' EX': ''}}{{form.color ? ' '+form.color: ''}}*
    🐣 *Chefe: {{form.chefe.trim()}}*
    ⏳ *Hora: {{form.time}}*
    🏟 *Gym: {{form.gym.trim()}}*{{form.location && `\n🏘️ *Localização: ${form.location.trim()}*`}}
    {{form.coord && `📍 *Coordenadas*${'\n'+this.form.coord}`}}

      <span v-for="(u, k) in users" :key="k">{{k + 1}}. {{ u.nick }} {{ u.level ? ' - ' + u.level : '' }}</span>
    </div>
    </pre>
      <div class="text-center">
        <button class="btn" type="submit">
          Copiar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { TheMask } from 'vue-the-mask'

export default {
  name: 'App',
  components: { TheMask },
  data: () => ({
    form: {
      raid: 5,
      ex: '',
      color: '',
      location: '',
      chefe: '',
      time: '',
      gym: '',
      coord: '',
      qtdLista: 10
    },
    listas: [5, 10, 15, 20],
    user: {
      nick: '',
      level: ''
    },
    users: [],
    codigo: ''
  }),
  watch: {
    'form.qtdLista'() {
      this.users = Array(Number(this.form.qtdLista))
        .fill()
        .map(() => ({ nick: '', level: '' }))
    }
  },
  methods: {
    async getUser() {
      await this.users.push({
        nick: this.user.nick,
        level: this.user.level
      })
      this.user.nick = ''
      this.user.level = ''
    },
    async getGerar() {
      let users = await this.users
        .map((i, k) => {
          return `${k + 1}. ${i.nick} ${i.level ? ` - ${i.level}` : ''}`
        })
        .join('\n')
      let codigo = `🔰 *RAID LEVEL ${this.form.raid}${
        this.form.ex ? ' EX' : ''
      }${this.form.color ? ' ' + this.form.color : ''}*
🐣 *Chefe: ${this.form.chefe.trim()}*
⏳ *Hora: ${this.form.time}*
🏟 *Gym: ${this.form.gym.trim()}*${this.form.location &&
        `\n🏘️ *Localização: ${this.form.location.trim()}*`}
${this.form.coord && `📍 *Coordenadas*${'\n' + this.form.coord}`}
    
${users}
      `
      this.$copyText(codigo).then(
        () => alert('Copiado'),
        () => alert('Erro')
      )
    }
  },
  mounted() {
    this.users = Array(this.form.qtdLista)
      .fill()
      .map(() => ({ nick: '', level: '' }))
  }
}
</script>

<style lang="stylus">
body{
	background-color: rgba(252, 252, 159, 0.705);
}

img{
	margin: 15px;
	width: 90%;
}
#app {
	font-family: monospace;
	font-size: 15px;
	color: #2c3e50;
	margin-top: 30px;
	line-height: 30px;
	font-weight: bolder;
}

pre {
	background: #f0f0f0;
	white-space: pre-line;
	padding-left: 30px;
  line-height: 18px;
}

span {
	display: block;
}

ul {
	list-style: none;
  padding-inline-start: 15px;
  padding-inline-end: 15px;
}

label {
	padding-left: 10px;
}

.users {
	display: flex;
  margin-bottom: 10px;
  .nick {
    flex: 2;
    display: flex;
	  justify-content: space-between;
    input {
      width 100%;
      border-radius 5px
    }
  }
  .level {
    flex: 1;
    margin-left 10px
    justify-content flex-start
    display: flex;
    .nick-level {
      width 30px
      border-radius 5px
    }
  }
}

.total{
	background: rgb(228, 226, 226);
	border: 2px solid #ccc;
	border-radius: 5px 0 0 5px;
  border-right 0
  height 34px
}
.imputs{
	background:white;
	padding: 6px;
	border: 2px solid #ccc;
	border-radius: 0 5px 5px 0;
}

label span{
	width: 20px;
	height: 20px;
	display: inline-block;
	background:white;
	border-radius: 50%;
	margin-right: 40px;
	margin-bottom: 10px;
}
.amarelo span::before{
	content: "";
	display: block;
	background: rgb(255, 217, 0);
	width: 20px;
	height: 20px;
	border-radius: 50%;

}
.azul span::before{
	content: "";
	display: block;
	background: blue;
	width: 20px;
	height: 20px;
	border-radius: 50%;

}
.vermelho span::before{
	content: "";
	display: block;
	background: red;
	width: 20px;
	height: 20px;
	border-radius: 50%;

}

label input:checked + span:before{
	content: "";
    border: 3px solid black;
}

input[type="radio"]{
	width: 0;
	height: 0;
	overflow: hidden;
	display: inline-block;
	margin: 0;
}

.lista-raid {
  margin-bottom: 15px;
  display: flex;
  .zero {
    flex: 0.8
  }
  .imputs {
    border-radius 0 5px 5px 0
  }
  .um {
    border-left 0
    border-radius 5px
    border-right 2px solid #ccc
    border-left 2px solid #ccc
    width: 60px
    margin-left 10px
    display flex
    align-items center
  }
}

.qtd-lista {
  display flex
  .total {
    flex: 0.56
  }
}

.color {
  display: flex;
  justify-content center
}

.btn {
  font-size: 25px
  background: #e4e2e2;
    border: 2px solid #ccc;
    border-radius: 5px
    padding 10px 15px
}

.lista {
  display: flex;
  margin-bottom: 15px;
  label {
    flex: 1
    flex-direction: row;
  }
  input {
    flex: 2
  }
}

.text-center {
  text-align center
  margin 20px
}

@media only screen and (min-width: 600px) {
  body {
    width 400px
    margin 0 auto
  }
}
</style>

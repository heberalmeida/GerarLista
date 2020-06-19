<template>
  <div id="app">
    <ul>
      <li>
        <label>🔰 RAID LEVEL </label>
        <select v-model="form.raid">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
        </select>
        <input type="checkbox" value="EX" v-model="form.ex" /> EX
        <select v-model="form.color">
          <option value="">Selecione a cor</option>
          <option>Mystic-Azul</option>
          <option>Valor-Vermelho</option>
          <option>Instinct-Amarelo</option>
        </select>
      </li>
      <li>
        <label>🐣 Chefe: </label> <input type="text" v-model="form.chefe" />
      </li>
      <li><label>⏳ Hora:</label> <input type="text" v-model="form.time" /></li>
      <li><label>🏟 Gym:</label> <input type="text" v-model="form.gym" /></li>
      <li>
        <label>🌎 Coordenadas:</label>
        <input type="text" v-model="form.coord" />
      </li>
      <li>
        <label>Quant. Lista </label>
        <select v-model="form.qtdLista">
          <option v-for="n in 20" :key="n" v-show="n > 2">{{ n }}</option>
        </select>
      </li>
    </ul>

    <ul>
      <li v-for="(u, k) in users" :key="k">
        <p>
          <label>Nick</label> <input type="text" v-model="u.nick" />
          <label>Level</label> <input type="text" v-model="u.level" />
        </p>
      </li>
    </ul>

    <pre ref="result">
      <div class="poke_raid">
    🔰 *RAID LEVEL {{form.raid}}{{form.ex ? ' EX': ''}}{{form.color ? ' '+form.color: ''}}*
    🐣 *Chefe: {{form.chefe}}*
    ⏳ *Hora: {{form.time}}*
    🏟 *Gym: {{form.gym}}*
    {{form.coord && `🌎 *Coordenadas: ${this.form.coord}*`}}

      <span v-for="(u, k) in users" :key="k">{{k + 1}}. {{ u.nick }} {{ u.level ? ' - ' + u.level : '' }}</span>
    </div>
    </pre>
    <button @click.prevent="getGerar">
      Copiar
    </button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    form: {
      raid: 5,
      ex: '',
      color: '',
      chefe: '',
      time: '',
      gym: '',
      coord: '',
      qtdLista: 8
    },
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
🐣 *Chefe: ${this.form.chefe}*
⏳ *Hora: ${this.form.time}*
🏟 *Gym: ${this.form.gym}*
  ${this.form.coord && `🌎 *Coordenadas: ${this.form.coord}*`}
    
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
#app
  font-family Helvetica, Arial, sans-serif
  color #2c3e50
  margin-top 60px

pre
  background #f0f0f0
  white-space pre-line
  padding-left 30px

span
  display block

ul
  list-style none

label
  padding-left 10px
</style>

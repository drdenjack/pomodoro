app.component('time-selector', {
    template: /*html*/ `
    <div id="time-selector">
        Set the start time:<br>
        <button class=timeButton @click='startTime = 15'>15m</button>
        <button class=timeButton @click='startTime = 20'>20m</button>
        <button class=timeButton @click='startTime = 25'>25m</button>
        <button class=customTimeButton @click='toggleCustom'>Custom</button>
        <br>
        <div v-if="showCustom">
            <input v-model="startTime" size="5"/>min
        </div>
    </div>
    `,
    data() {
        return {
            startTime: 0,
            showCustom: false
        }
    },
    methods: {
        toggleCustom: function() {
            this.showCustom = ~this.showCustom;
        }
    },
    watch: {
        // tell other components (including parent) that the value changed
        startTime: function () {
            console.log('telling the world that the startTime changed to ' + this.startTime);
            this.$emit('startTime-changed', this.startTime);
        }
    }
})
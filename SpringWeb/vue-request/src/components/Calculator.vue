<template>
    <b-row class="m-2 mt-3">
        <b-col>
            <div style=" display: flex; justify-content: center;">
                <b-list-group align-self="center" flush sm>
                    <b-list-group-item to="/calculator-json" exact exact-active-class="active"><span>JSON</span></b-list-group-item>
                    <b-list-group-item to="/calculator-xml" exact exact-active-class="active"><span>XML Schema</span></b-list-group-item>
                </b-list-group>
            </div>
            <router-view></router-view>
        </b-col>
    </b-row>
</template>

<script>
    export default {
        name: "Calculator"
    }
</script>

<style scoped>

</style>
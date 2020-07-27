<template>
  <v-menu open-on-hover :close-on-content-click="false" top offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-palette-outline</v-icon>
      </v-btn>
    </template>
    <v-card max-width="160" tile>
      <v-card-text class="pa-2 d-flex flex-wrap">
        <v-tooltip
          color="grey darken-3"
          bottom
          v-for="(value, name) in colors"
          :key="name"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              :color="`${name !== 'Default' ? value : ''}`"
              @click="colorSelected(value)"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>
                {{
                  name !== 'Default'
                    ? 'mdi-checkbox-blank-circle'
                    : 'mdi-checkbox-blank-circle-outline'
                }}
              </v-icon>
            </v-btn>
          </template>
          <span>{{ name }}</span>
        </v-tooltip>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import { CardColorTypes } from '../store/enums';

@Component
export default class ColorPickerMenu extends Vue {
  get colors() {
    return CardColorTypes;
  }

  @Emit('color-selected')
  colorSelected(color: string): string {
    return color;
  }
}
</script>

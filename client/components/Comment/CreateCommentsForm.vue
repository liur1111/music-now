<!-- Form for creating freets (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateCommentForm',
  mixins: [BlockForm],
  props: {
    mixtapeId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      url: `/api/comments/${this.mixtapeId}`,
      method: 'POST',
      hasBody: true,
      fields: [{id: 'content', label: 'Content', value: ''}],
      title: 'Create a comment',
      refreshComments: this.mixtapeId,
      callback: () => {
        const message = 'Successfully created a comment!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 1000);
      }
    };
  }
};
</script>

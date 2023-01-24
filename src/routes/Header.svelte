<script lang="ts">
	import type { UserInfo } from '../app';

	export let userInfo: UserInfo;
</script>

<div>
	To jest header
	<span>
		{#if userInfo.loggedIn}
			Zalogowano jako {userInfo.username}
			<form action="/logout" method="POST">
				<button type="submit">Log out</button>
			</form>
		{:else}
			Nie zalogowano
		{/if}
	</span>
</div>

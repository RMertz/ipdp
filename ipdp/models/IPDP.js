const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const IPDPSchema = new Schema({
	
	user_id: {
					type: String,
					required: false 
	},
	season: {
					type: String,
					required: false 
	},

	nickname: {
					type: String,
					required: false 
	},

	non_soccer_facts: {
					type: String,
					required: false 
	},

	living_in_montana: {
					type: String,
					required: false 
	},

	live_anywhere_in: {
					type: String,
					required: false 
	},
	favorite_position: [{
					type: String,
					required: false,
	}],
	best_position: [{
					type: String,
					required: false,
	}],
	favorite_position_description: {
					type: String,
					required: false
	},
	best_position_description: {
					type: String,
					required: false
	},
	first_touch: {
					type: String,
					required: false
	},
	dribbling: {
					type: String,
					required: false
	},
	short_passing: {
					type: String,
					required: false
	},
	long_passing: {
					type: String,
					required: false
	},
	shooting: {
					type: String,
					required: false
	},
	tackling: {
					type: String,
					required: false
	},
	shielding: {
					type: String,
					required: false
	},
	shot_stopping_gk: {
					type: String,
					required: false
	},
	balls_in_air_gk: {
					type: String,
					required: false
	},
	handling_gk: {
					type: String,
					required: false
	},
	break_aways_gk: {
					type: String,
					required: false
	},
	positioning_gk: {
					type: String,
					required: false
	},
	playing_feet_gk: {
					type: String,
					required: false
	},
	distribution_gk: {
					type: String,
					required: false
	},
	anticipation: {
					type: String,
					required: false
	},
	positioning: {
					type: String,
					required: false
	},
	reading_play: {
					type: String,
					required: false
	},
	speed_play: {
					type: String,
					required: false
	},
	movement_off_ball: {
					type: String,
					required: false
	},
	strength: {
					type: String,
					required: false
	},
	quickness: {
					type: String,
					required: false
	},
	top_speed: {
					type: String,
					required: false
	},
	endurance: {
					type: String,
					required: false
	},
	coordination: {
					type: String,
					required: false
	},
	concerned_not_do_well: {
					type: String,
					required: false
	},
	i_feel_confident: {
					type: String,
					required: false
	},
	confident_can_meet_challenge: {
					type: String,
					required: false
	},
	concerned_choking: {
					type: String,
					required: false
	},
	confident_performing: {
					type: String,
					required: false
	},
	concerned_performing_poorly: {
					type: String,
					required: false
	},
	confident_mentally_picturing: {
					type: String,
					required: false
	},
	concerned_others_disappointed: {
					type: String,
					required: false
	},
	confident_under_pressure: {
					type: String,
					required: false
	},
	
	close_to_coaches: {
					type: String,
					required: false
	},
	feel_commited_coaches: {
					type: String,
					required: false
	},
	sport_career_promising: {
					type: String,
					required: false
	},
	like_coaches: {
					type: String,
					required: false
	},
	trust_coaches: {
					type: String,
					required: false
	},
	appreciate_coaches: {
					type: String,
					required: false
	},
	respect_coaches: {
					type: String,
					required: false
	},
	feel_ease_coached: {
					type: String,
					required: false
	},
	responsive_coached: {
					type: String,
					required: false
	},
	coached_ready: {
					type: String,
					required: false
	},
	coached_friendly: {
					type: String,
					required: false
	},
	player_1: {
					type: String,
					required: false
	},
	player_2: {
					type: String,
					required: false
	},
	player_3: {
					type: String,
					required: false
	},
	give_positive_feedback: {
					type: String,
					required: false
	},
	encourage_teammate: {
					type: String,
					required: false
	},
	give_constructive_feedback: {
					type: String,
					required: false
	},
	congratulate_teammate: {
					type: String,
					required: false
	},
	help_opponent_ground: {
					type: String,
					required: false
	},
	opponent_injured: {
					type: String,
					required: false
	},
	help_injured_opponent: {
					type: String,
					required: false
	},
	argue_with_teammate: {
					type: String,
					required: false
	},
	verbally_abuse_teammate: {
					type: String,
					required: false
	},
	critisize_teammate: {
					type: String,
					required: false
	},
	yell_at_teammate: {
					type: String,
					required: false
	},
	show_frustration: {
					type: String,
					required: false
	},
	critisize_opponent: {
					type: String,
					required: false
	},
	foul_opponent: {
					type: String,
					required: false
	},
	retaliate_after_foul: {
					type: String,
					required: false
	},
	wind_up_opponent: {
					type: String,
					required: false
	},
	try_injure_opponent: {
					type: String,
					required: false
	},
	intentionally_distract_opponent: {
					type: String,
					required: false
	},
	intentionally_break_rules: {
					type: String,
					required: false
	},
	physically_intimidate_opponent: {
					type: String,
					required: false
	},
	short_term_goals: {
					type: String,
					required: false
	},
	long_term_goals: {
					type: String,
					required: false
	},
	what_can_coaches_do: {
					type: String,
					required: false
	},
	want_to_say: {
					type: String,
					required: false
	},
	
});

// Virtual for IPDP URL
IPDPSchema
.virtual('url')
.get(function () {
				return this._id;
});


const IPDP = mongoose.model('IPDP', IPDPSchema);

module.exports = IPDP;

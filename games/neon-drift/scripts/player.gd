extends CharacterBody2D

signal died

const RUN_SPEED := 390.0
const JUMP_VELOCITY := -650.0
const ACCELERATION := 2400.0
const FRICTION := 2800.0

var controls_enabled := true

func _physics_process(delta: float) -> void:
	if not controls_enabled:
		return

	var direction := Input.get_axis("move_left", "move_right")
	if direction != 0.0:
		velocity.x = move_toward(velocity.x, direction * RUN_SPEED, ACCELERATION * delta)
	else:
		velocity.x = move_toward(velocity.x, 0.0, FRICTION * delta)

	if not is_on_floor():
		velocity.y += get_gravity().y * delta
	elif Input.is_action_just_pressed("jump"):
		velocity.y = JUMP_VELOCITY

	move_and_slide()

	if global_position.y > 1100.0:
		died.emit()

func reset_to(spawn_position: Vector2) -> void:
	global_position = spawn_position
	velocity = Vector2.ZERO
	controls_enabled = true

func freeze() -> void:
	controls_enabled = false
	velocity = Vector2.ZERO
